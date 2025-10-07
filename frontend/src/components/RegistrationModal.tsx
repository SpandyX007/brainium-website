import { X, User, Mail, Phone, Users as UsersIcon, CheckCircle2, Download, Sparkles } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import BackendNotification from './BackendNotification';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

interface TeamMember {
  name: string;
  semester: string;
  usn: string;
  email: string;
  phone: string;
}

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function RegistrationModal({ isOpen, onClose, eventTitle }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: '2',
    leaderName: '',
    leaderSemester: '1',
    leaderUSN: '',
    leaderEmail: '',
    leaderPhone: '',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', semester: '1', usn: '', email: '', phone: '' }
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [registrationId, setRegistrationId] = useState('');
  const [showBackendNotification, setShowBackendNotification] = useState(false);

  // Generate unique registration ID
  const generateRegistrationId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `BRA-${timestamp}-${random}`.toUpperCase();
  };

  // USN Validation: 1BY23AI045 or 1TD24CS123
  const validateUSN = (usn: string): boolean => {
    const usnPattern = /^1(BY|TD)\d{2}[A-Z]{2}\d{3}$/;
    return usnPattern.test(usn.toUpperCase());
  };

  // Phone Validation: 10 digits starting with 6,7,8,9
  const validatePhone = (phone: string): boolean => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(phone);
  };

  // Real-time validation with dynamic error clearing
  const validateField = (name: string, value: string, memberIndex?: number) => {
    const errors: {[key: string]: string} = {};
    const fieldKey = memberIndex !== undefined ? `${name}_${memberIndex}` : name;

    // Check for name fields (includes team member 'name' field)
    if (name.includes('Name') || name === 'teamName' || name === 'name') {
      if (!value.trim()) {
        errors[fieldKey] = 'This field is required';
      } else if (value.length < 4) {
        errors[fieldKey] = 'Name must be at least 4 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errors[fieldKey] = 'Name should only contain letters';
      }
    } 
    // Check for USN fields (includes team member 'usn' field)
    else if (name.includes('USN') || name === 'usn') {
      if (!value.trim()) {
        errors[fieldKey] = 'USN is required';
      } else if (!validateUSN(value)) {
        errors[fieldKey] = 'Please Enter a valid USN format';
      }
    } 
    // Check for email fields (includes team member 'email' field)
    else if (name.includes('Email') || name === 'email') {
      if (!value.trim()) {
        errors[fieldKey] = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[fieldKey] = 'Please enter a valid email address';
      }
    } 
    // Check for phone fields (includes team member 'phone' field)
    else if (name.includes('Phone') || name === 'phone') {
      if (!value.trim()) {
        errors[fieldKey] = 'Phone number is required';
      } else if (!validatePhone(value)) {
        errors[fieldKey] = 'Please enter a valid Phone Number';
      }
    }

    setValidationErrors(prev => ({
      ...prev,
      [fieldKey]: errors[fieldKey] || ''
    }));

    // Return whether field is valid (for immediate feedback)
    return !errors[fieldKey];
  };

  // Handle team size change
  const handleTeamSizeChange = (size: string) => {
    setFormData({ ...formData, teamSize: size });
    const memberCount = parseInt(size) - 1; // Subtract 1 for leader
    const newMembers: TeamMember[] = [];
    
    for (let i = 0; i < memberCount; i++) {
      newMembers.push(teamMembers[i] || { name: '', semester: '1', usn: '', email: '', phone: '' });
    }
    setTeamMembers(newMembers);
  };

  // Handle team member input change
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    
    // Auto-capitalize USN
    if (field === 'usn') {
      newMembers[index][field] = value.toUpperCase();
    }
    
    setTeamMembers(newMembers);
    validateField(field, value, index);
  };

  // Handle leader input change
  const handleInputChange = (name: string, value: string) => {
    // Auto-capitalize USN
    if (name === 'leaderUSN') {
      value = value.toUpperCase();
    }
    
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Download QR Code
  const downloadQRCode = () => {
    const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `brainium-registration-${registrationId}.png`;
      link.href = url;
      link.click();
    }
  };

  // Validate all form fields before submission
  const validateAllFields = (): boolean => {
    let isValid = true;
    const errors: {[key: string]: string} = {};

    // Validate team name
    if (!formData.teamName.trim()) {
      errors.teamName = 'Team name is required';
      isValid = false;
    }

    // Validate leader fields
    if (!formData.leaderName.trim() || formData.leaderName.length < 2) {
      errors.leaderName = 'Leader name must be at least 2 characters';
      isValid = false;
    }
    if (!validateUSN(formData.leaderUSN)) {
      errors.leaderUSN = 'Invalid USN format';
      isValid = false;
    }
    if (!formData.leaderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.leaderEmail)) {
      errors.leaderEmail = 'Valid email is required';
      isValid = false;
    }
    if (!validatePhone(formData.leaderPhone)) {
      errors.leaderPhone = 'Valid phone number is required';
      isValid = false;
    }

    // Validate team members
    teamMembers.forEach((member, index) => {
      if (!member.name.trim() || member.name.length < 2) {
        errors[`name_${index}`] = 'Name must be at least 2 characters';
        isValid = false;
      }
      if (!validateUSN(member.usn)) {
        errors[`usn_${index}`] = 'Invalid USN format';
        isValid = false;
      }
      if (!member.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
        errors[`email_${index}`] = 'Valid email is required';
        isValid = false;
      }
      if (!validatePhone(member.phone)) {
        errors[`phone_${index}`] = 'Valid phone number is required';
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields first
    if (!validateAllFields()) {
      setErrorMessage('Please fix all validation errors before submitting.');
      setSubmitStatus('error');
      return;
    }
    
    // COMMENTED OUT FOR TESTING - Remove comments to enable duplicate check
    // if (hasSubmitted) {
    //   setErrorMessage('You have already registered for this event.');
    //   setSubmitStatus('error');
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const regId = generateRegistrationId();
      setRegistrationId(regId);

      const submissionData = {
        registrationId: regId,
        eventTitle,
        teamName: formData.teamName,
        teamSize: formData.teamSize,
        leader: {
          name: formData.leaderName,
          semester: formData.leaderSemester,
          usn: formData.leaderUSN,
          email: formData.leaderEmail,
          phone: formData.leaderPhone,
        },
        teamMembers: teamMembers,
        timestamp: new Date().toISOString(),
      };

      console.log('Submitting data:', submissionData);

      if (!GOOGLE_SCRIPT_URL) {
        setShowBackendNotification(true);
        console.warn('Backend not configured');
      } else {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
      }

      setSubmitStatus('success');
      
      // COMMENTED OUT FOR TESTING - Remove comments to enable session storage
      // sessionStorage.setItem(`registered_${eventTitle}`, 'true');

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit registration. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={submitStatus !== 'success' ? onClose : undefined}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-950/95 to-black/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-scaleIn">
        {submitStatus === 'success' ? (
          // Success Screen with QR Code
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              Registration Successful!
            </h2>
            
            <p className="text-lg text-green-300 mb-6">
              ✅ Your team has been successfully registered for the event
            </p>
            
            <p className="text-2xl text-gray-300 mb-2">
              Welcome to <span className="text-purple-400 font-bold">{eventTitle}</span>
            </p>
            
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/50 rounded-2xl p-8 my-8 backdrop-blur-sm">
              <p className="text-purple-300 font-semibold text-lg mb-4">Your Registration ID</p>
              <p className="text-4xl font-bold text-white mb-6 tracking-wider">{registrationId}</p>
              
              <div className="bg-white p-6 rounded-xl inline-block mb-4">
                <QRCodeCanvas
                  id="qr-code-canvas"
                  value={JSON.stringify({
                    registrationId,
                    eventTitle,
                    teamName: formData.teamName,
                    leaderName: formData.leaderName,
                    timestamp: new Date().toISOString()
                  })}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                Scan this QR code at the event for attendance marking
              </p>
              
              <button
                onClick={downloadQRCode}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
            </div>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 mb-8">
              <p className="text-gray-300 mb-3">
                📧 A confirmation email has been sent to <span className="text-purple-400 font-semibold">{formData.leaderEmail}</span>
              </p>
              <p className="text-gray-400 text-sm mb-2">
                Please save your Registration ID and QR code for event check-in.
              </p>
              <p className="text-gray-400 text-sm">
                Check your spam folder if you don't see the email in your inbox.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitStatus('idle');
                onClose();
              }}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="sticky top-0 bg-gradient-to-b from-purple-950 to-purple-950/80 p-6 border-b border-purple-500/20 z-20 backdrop-blur-sm">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-purple-500/20 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Team Registration
                </h2>
              </div>
              <p className="text-gray-300 text-lg font-semibold">{eventTitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Team Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                  <UsersIcon className="w-4 h-4" />
                  Team Name
                  <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.teamName}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    validationErrors.teamName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                  }`}
                  placeholder="Enter your team name"
                />
                {validationErrors.teamName && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.teamName}</p>
                )}
              </div>

              {/* Team Size */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                  <UsersIcon className="w-4 h-4" />
                  Number of Team Members
                  <span className="text-pink-500">*</span>
                </label>
                <select
                  required
                  value={formData.teamSize}
                  onChange={(e) => handleTeamSizeChange(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="2">2 Members</option>
                  <option value="3">3 Members</option>
                  <option value="4">4 Members</option>
                </select>
              </div>

              {/* Team Leader Details */}
              <div className="border-t border-purple-500/30 pt-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Team Leader Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Leader Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                      <User className="w-4 h-4" />
                      Full Name
                      <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.leaderName}
                      onChange={(e) => handleInputChange('leaderName', e.target.value)}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.leaderName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="John Doe"
                    />
                    {validationErrors.leaderName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.leaderName}</p>
                    )}
                  </div>

                  {/* Leader Semester */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                      Semester
                      <span className="text-pink-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.leaderSemester}
                      onChange={(e) => handleInputChange('leaderSemester', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    >
                      <option value="1">1st Semester</option>
                      <option value="3">3rd Semester</option>
                      <option value="5">5th Semester</option>
                    </select>
                  </div>

                  {/* Leader USN */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                      USN
                      <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.leaderUSN}
                      onChange={(e) => handleInputChange('leaderUSN', e.target.value)}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all uppercase ${
                        validationErrors.leaderUSN 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="1BY23AI045"
                      maxLength={10}
                    />
                    {validationErrors.leaderUSN && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.leaderUSN}</p>
                    )}
                  </div>

                  {/* Leader Email */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                      <Mail className="w-4 h-4" />
                      Email Address
                      <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.leaderEmail}
                      onChange={(e) => handleInputChange('leaderEmail', e.target.value)}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.leaderEmail 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="john@example.com"
                    />
                    {validationErrors.leaderEmail && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.leaderEmail}</p>
                    )}
                  </div>

                  {/* Leader Phone */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                      <Phone className="w-4 h-4" />
                      Phone Number
                      <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.leaderPhone}
                      onChange={(e) => {
                        // Allow copy-paste and filter to only digits, limit to 10 characters
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleInputChange('leaderPhone', value);
                      }}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.leaderPhone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {validationErrors.leaderPhone && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.leaderPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Team Members */}
              {teamMembers.map((member, index) => (
                <div key={index} className="border-t border-purple-500/30 pt-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    Team Member {index + 1}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Member Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                        Full Name
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                          validationErrors[`name_${index}`] 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                        placeholder="Jane Smith"
                      />
                      {validationErrors[`name_${index}`] && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[`name_${index}`]}</p>
                      )}
                    </div>

                    {/* Member Semester */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                        Semester
                        <span className="text-pink-500">*</span>
                      </label>
                      <select
                        required
                        value={member.semester}
                        onChange={(e) => handleTeamMemberChange(index, 'semester', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="1">1st Semester</option>
                        <option value="3">3rd Semester</option>
                        <option value="5">5th Semester</option>
                      </select>
                    </div>

                    {/* Member USN */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                        USN
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={member.usn}
                        onChange={(e) => handleTeamMemberChange(index, 'usn', e.target.value)}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all uppercase ${
                          validationErrors[`usn_${index}`] 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                        placeholder="1TD24CS123"
                        maxLength={10}
                      />
                      {validationErrors[`usn_${index}`] && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[`usn_${index}`]}</p>
                      )}
                    </div>

                    {/* Member Email */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                        <Mail className="w-4 h-4" />
                        Email Address
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={member.email}
                        onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                          validationErrors[`email_${index}`] 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                        placeholder="jane@example.com"
                      />
                      {validationErrors[`email_${index}`] && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[`email_${index}`]}</p>
                      )}
                    </div>

                    {/* Member Phone */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                        <Phone className="w-4 h-4" />
                        Phone Number
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={member.phone}
                        onChange={(e) => {
                          // Allow copy-paste and filter to only digits, limit to 10 characters
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleTeamMemberChange(index, 'phone', value);
                        }}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                          validationErrors[`phone_${index}`] 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-purple-500/30 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                        placeholder="9876543210"
                        maxLength={10}
                      />
                      {validationErrors[`phone_${index}`] && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors[`phone_${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {submitStatus === 'error' && errorMessage && (
                <div className="p-8 bg-gradient-to-r from-red-600/30 via-red-700/30 to-red-800/30 border-2 border-red-500 rounded-2xl text-center shadow-2xl shadow-red-500/30 mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <X className="w-12 h-12 text-red-400 animate-pulse" />
                    <span className="text-3xl font-black text-red-300 tracking-wide">REGISTRATION FAILED</span>
                  </div>
                  <p className="text-xl font-bold text-red-200 mb-2">⚠️ Something went wrong!</p>
                  <p className="text-lg text-red-300 font-semibold">{errorMessage}</p>
                  <p className="text-red-400 text-sm mt-3">Please try again or contact support if the issue persists.</p>
                  
                  <div className="bg-red-900/40 border border-red-400/50 rounded-xl p-4 mt-4">
                    <p className="text-red-200 font-semibold mb-2">📞 Need Help? Contact Us:</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-red-300">📧 <span className="font-semibold">John Doe:</span> john.doe@brainium.com</p>
                      <p className="text-red-300">📱 <span className="font-semibold">Phone:</span> +91 98765 43210</p>
                      <p className="text-red-300">📧 <span className="font-semibold">Jane Smith:</span> jane.smith@brainium.com</p>
                      <p className="text-red-300">📱 <span className="font-semibold">Phone:</span> +91 87654 32109</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      
      <BackendNotification 
        show={showBackendNotification} 
        onClose={() => setShowBackendNotification(false)} 
      />
    </div>
  );
}
