import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Phone, MapPin, Calendar, 
  Search, Send, FileText, Star, MessageSquare,
  Eye, EyeOff, Upload, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const FormsShowcase = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rating, setRating] = useState([3]);
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (formName: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${formName} submitted successfully!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            HTML Forms Showcase
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
          >
            A comprehensive demonstration of various HTML form elements with responsive CSS styling
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {/* 1. Login Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Lock className="h-5 w-5" />
                  Login Form
                </CardTitle>
                <CardDescription>Basic authentication form with password toggle</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Login form")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="login-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Registration Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-success/5 border-b">
                <CardTitle className="flex items-center gap-2 text-success">
                  <User className="h-5 w-5" />
                  Registration Form
                </CardTitle>
                <CardDescription>Complete user registration with validation</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Registration form")} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="dob" type="date" className="pl-10" required />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
                    </Label>
                  </div>
                  <Button type="submit" variant="success" className="w-full">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-accent/5 border-b">
                <CardTitle className="flex items-center gap-2 text-accent">
                  <MessageSquare className="h-5 w-5" />
                  Contact Form
                </CardTitle>
                <CardDescription>Get in touch with text area for messages</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Contact form")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="contact-name" placeholder="Your name" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="contact-email" type="email" placeholder="you@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..." 
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. Survey Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-warning/5 border-b">
                <CardTitle className="flex items-center gap-2 text-warning">
                  <FileText className="h-5 w-5" />
                  Survey Form
                </CardTitle>
                <CardDescription>Radio buttons and checkboxes for surveys</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Survey form")} className="space-y-5">
                  <div className="space-y-3">
                    <Label>How did you hear about us?</Label>
                    <RadioGroup defaultValue="social">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="social" id="social" />
                        <Label htmlFor="social" className="font-normal">Social Media</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friend" id="friend" />
                        <Label htmlFor="friend" className="font-normal">Friend/Colleague</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="search" id="search" />
                        <Label htmlFor="search" className="font-normal">Search Engine</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="font-normal">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-3">
                    <Label>Which features interest you?</Label>
                    <div className="space-y-2">
                      {["AI Grading", "Analytics", "File Upload", "Real-time Feedback"].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={feature.toLowerCase().replace(" ", "-")} />
                          <Label htmlFor={feature.toLowerCase().replace(" ", "-")} className="font-normal">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Experience Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Submit Survey</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 5. Feedback Form with Slider */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-info/5 border-b">
                <CardTitle className="flex items-center gap-2 text-info">
                  <Star className="h-5 w-5" />
                  Feedback Form
                </CardTitle>
                <CardDescription>Rating slider and toggle switches</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Feedback form")} className="space-y-5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Overall Satisfaction</Label>
                      <span className="text-2xl font-bold text-primary">{rating[0]}/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            star <= rating[0] ? "fill-warning text-warning" : "text-muted"
                          }`}
                          onClick={() => setRating([star])}
                        />
                      ))}
                    </div>
                    <Slider
                      value={rating}
                      onValueChange={setRating}
                      max={5}
                      min={1}
                      step={1}
                      className="py-2"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Preferences</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch 
                          checked={notifications}
                          onCheckedChange={setNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Dark Mode</p>
                          <p className="text-xs text-muted-foreground">Use dark theme</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suggestions">Suggestions</Label>
                    <Textarea 
                      id="suggestions" 
                      placeholder="Any suggestions for improvement?"
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Feedback</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 6. File Upload Form */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-destructive/5 border-b">
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Upload className="h-5 w-5" />
                  File Upload Form
                </CardTitle>
                <CardDescription>Drag & drop file upload with preview</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("File upload form")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upload-title">Document Title</Label>
                    <Input id="upload-title" placeholder="Enter document title" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm font-medium">Drag & drop files here</p>
                      <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                      <input type="file" className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.ppt,.pptx" />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Select Files
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)</p>
                  </div>
                  <div className="space-y-2">
                    <Label>File Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project Report</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="thesis">Thesis/Dissertation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 7. Search Form */}
          <motion.div variants={itemVariants} className="md:col-span-2 xl:col-span-1">
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-secondary border-b">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Form
                </CardTitle>
                <CardDescription>Advanced search with filters</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Search form")} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search assignments, courses, students..." 
                      className="pl-10 pr-20"
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      Search
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Date Range</Label>
                      <Select>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Any time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Sort By</Label>
                      <Select>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Assignments", "Courses", "Students", "Grades"].map((filter) => (
                      <label 
                        key={filter}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full cursor-pointer hover:bg-muted/80 transition-colors text-sm"
                      >
                        <Checkbox id={`filter-${filter}`} className="h-3.5 w-3.5" />
                        {filter}
                      </label>
                    ))}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 8. Address Form */}
          <motion.div variants={itemVariants} className="md:col-span-2 xl:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  Address Form
                </CardTitle>
                <CardDescription>Multi-field address collection with responsive grid layout</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit("Address form")} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input id="street" placeholder="123 Main Street" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apt">Apt/Suite/Unit (Optional)</Label>
                      <Input id="apt" placeholder="Apt 4B" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          <SelectItem value="il">Illinois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input id="zip" placeholder="10001" pattern="[0-9]{5}" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="billing-same" />
                    <Label htmlFor="billing-same" className="text-sm">Billing address same as shipping</Label>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1">
                      <Check className="h-4 w-4 mr-2" />
                      Save Address
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Form Elements Reference */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-success/5">
            <CardHeader>
              <CardTitle className="text-center">Form Elements Used</CardTitle>
              <CardDescription className="text-center">This showcase demonstrates the following HTML form elements with CSS styling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                {[
                  { name: "Text Input", icon: "📝" },
                  { name: "Email Input", icon: "📧" },
                  { name: "Password", icon: "🔒" },
                  { name: "Phone Input", icon: "📱" },
                  { name: "Date Picker", icon: "📅" },
                  { name: "Textarea", icon: "📄" },
                  { name: "Checkbox", icon: "☑️" },
                  { name: "Radio Button", icon: "🔘" },
                  { name: "Select/Dropdown", icon: "📋" },
                  { name: "File Upload", icon: "📎" },
                  { name: "Range Slider", icon: "🎚️" },
                  { name: "Toggle Switch", icon: "🔀" },
                ].map((element) => (
                  <div 
                    key={element.name} 
                    className="p-3 bg-background rounded-lg shadow-sm border"
                  >
                    <span className="text-2xl">{element.icon}</span>
                    <p className="text-xs font-medium mt-1">{element.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-70">
            HTML Forms Showcase — Demonstrating responsive form design with modern CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FormsShowcase;
