-- Create app_role enum for role-based access
CREATE TYPE public.app_role AS ENUM ('student', 'professor', 'admin');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    professor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    semester TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignments table
CREATE TABLE public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    max_score INTEGER DEFAULT 100,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rubrics table
CREATE TABLE public.rubrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
    criterion_name TEXT NOT NULL,
    description TEXT,
    max_points INTEGER NOT NULL,
    weight DECIMAL(5,2) DEFAULT 1.0,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'graded', 'error')),
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    version INTEGER DEFAULT 1,
    UNIQUE (assignment_id, student_id, version)
);

-- Create submission_files table (stores file URLs, not files themselves)
CREATE TABLE public.submission_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('document', 'audio', 'video')),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grades table
CREATE TABLE public.grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL UNIQUE,
    total_score DECIMAL(5,2),
    ai_score DECIMAL(5,2),
    final_score DECIMAL(5,2),
    confidence_score DECIMAL(3,2),
    ai_feedback TEXT,
    professor_override BOOLEAN DEFAULT false,
    override_reason TEXT,
    overridden_by UUID REFERENCES auth.users(id),
    graded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rubric_scores table (per-criterion scores)
CREATE TABLE public.rubric_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_id UUID REFERENCES public.grades(id) ON DELETE CASCADE NOT NULL,
    rubric_id UUID REFERENCES public.rubrics(id) ON DELETE CASCADE NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    ai_reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (grade_id, rubric_id)
);

-- Create course_enrollments table
CREATE TABLE public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (course_id, student_id)
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rubric_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user's role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile and role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student'));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS POLICIES

-- user_roles policies
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- courses policies
CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Professors can create courses" ON public.courses
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Professors can update own courses" ON public.courses
  FOR UPDATE USING (professor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete courses" ON public.courses
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- assignments policies
CREATE POLICY "Students can view assignments for enrolled courses" ON public.assignments
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.course_enrollments WHERE course_id = assignments.course_id AND student_id = auth.uid())
    OR public.has_role(auth.uid(), 'professor')
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Professors can manage assignments" ON public.assignments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.courses WHERE id = assignments.course_id AND professor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- rubrics policies
CREATE POLICY "Users can view rubrics for accessible assignments" ON public.rubrics
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.course_enrollments ce ON ce.course_id = a.course_id
      WHERE a.id = rubrics.assignment_id AND ce.student_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'professor')
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Professors can manage rubrics" ON public.rubrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = rubrics.assignment_id AND c.professor_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin')
  );

-- submissions policies
CREATE POLICY "Students can view own submissions" ON public.submissions
  FOR SELECT USING (student_id = auth.uid() OR public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students can create submissions" ON public.submissions
  FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can update own pending submissions" ON public.submissions
  FOR UPDATE USING (student_id = auth.uid() AND status = 'pending');

-- submission_files policies
CREATE POLICY "Users can view files for accessible submissions" ON public.submission_files
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.submissions WHERE id = submission_files.submission_id AND student_id = auth.uid())
    OR public.has_role(auth.uid(), 'professor')
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Students can upload files to own submissions" ON public.submission_files
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.submissions WHERE id = submission_files.submission_id AND student_id = auth.uid())
  );

-- grades policies
CREATE POLICY "Students can view own grades" ON public.grades
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.submissions WHERE id = grades.submission_id AND student_id = auth.uid())
    OR public.has_role(auth.uid(), 'professor')
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Professors can manage grades" ON public.grades
  FOR ALL USING (public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'admin'));

-- rubric_scores policies
CREATE POLICY "Users can view scores for accessible grades" ON public.rubric_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.grades g
      JOIN public.submissions s ON s.id = g.submission_id
      WHERE g.id = rubric_scores.grade_id AND s.student_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'professor')
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "System can manage rubric scores" ON public.rubric_scores
  FOR ALL USING (public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'admin'));

-- course_enrollments policies
CREATE POLICY "Students can view own enrollments" ON public.course_enrollments
  FOR SELECT USING (student_id = auth.uid() OR public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Professors and admins can manage enrollments" ON public.course_enrollments
  FOR ALL USING (public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'admin'));

-- audit_logs policies
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);