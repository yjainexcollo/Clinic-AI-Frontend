import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import PersonalForm from "./components/PersonalForm";
import Navigation from "./components/Navigation";
import WorkflowSelector from "./components/WorkflowSelector";
import WalkInPatientForm from "./components/WalkInPatientForm";
import Index from "./pages/Index";
import SoapSummary from "./pages/SoapSummary";
import VitalsForm from "./pages/VitalsForm";
import TranscriptUpload from "./pages/TranscriptUpload";
import AdhocTranscribe from "./pages/AdhocTranscribe";
import DoctorPreferences from "./pages/DoctorPreferences";
import PostVisitSummary from "./pages/PostVisitSummary";
import AudioManagement from "./pages/AudioManagement";
import WalkInTranscription from "./pages/WalkInTranscription";
import WalkInVitals from "./pages/WalkInVitals";
import WalkInSoap from "./pages/WalkInSoap";
import WalkInPostVisit from "./pages/WalkInPostVisit";

// Conditional Navigation Component
const ConditionalNavigation: React.FC = () => {
  const location = useLocation();
  
  // Only show navigation on the audio page
  const shouldShowNav = location.pathname === '/audio';
  
  return shouldShowNav ? <Navigation /> : null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ConditionalNavigation />
      <Routes>
        <Route path="/" element={<Navigate to="/workflow-selector" replace />} />
        <Route path="/workflow-selector" element={<WorkflowSelectorPage />} />
        <Route path="/patient-registration" element={<PatientRegistrationPage />} />
        <Route path="/walk-in-registration" element={<WalkInRegistrationPage />} />
        <Route path="/walk-in/:patientId/:visitId" element={<WalkInTranscription />} />
        <Route path="/intake/:patientId" element={<IntakePage />} />
        <Route path="/soap/:patientId/:visitId" element={<SoapSummary />} />
        <Route path="/vitals/:patientId/:visitId" element={<VitalsForm />} />
        <Route path="/transcribe/:patientId/:visitId" element={<TranscriptUpload />} />
        <Route path="/transcribe/adhoc" element={<AdhocTranscribe />} />
        <Route path="/doctor/preferences" element={<DoctorPreferences />} />
        <Route path="/post-visit/:patientId/:visitId" element={<PostVisitSummary />} />
        
        {/* Walk-in specific routes */}
        <Route path="/walk-in-vitals/:patientId/:visitId" element={<WalkInVitals />} />
        <Route path="/walk-in-soap/:patientId/:visitId" element={<WalkInSoap />} />
        <Route path="/walk-in-post-visit/:patientId/:visitId" element={<WalkInPostVisit />} />
        <Route path="/audio" element={<AudioManagement />} />
        <Route path="*" element={<Navigate to="/workflow-selector" replace />} />
      </Routes>
    </Router>
  );
};

// Workflow Selector Page Component
const WorkflowSelectorPage: React.FC = () => {
  const handleWorkflowSelected = (workflowType: "scheduled" | "walk-in") => {
    if (workflowType === "scheduled") {
      // Navigate to scheduled patient registration
      window.location.href = "/patient-registration";
    } else {
      // Navigate to walk-in patient registration
      window.location.href = "/walk-in-registration";
    }
  };

  return <WorkflowSelector onWorkflowSelected={handleWorkflowSelected} />;
};

// Patient Registration Page Component (Scheduled)
const PatientRegistrationPage: React.FC = () => {
  const handlePatientCreated = (patientId: string) => {
    // Navigate to intake form with patient ID
    window.location.href = `/intake/${patientId}`;
  };

  return <PersonalForm onPatientCreated={handlePatientCreated} />;
};

// Walk-in Registration Page Component
const WalkInRegistrationPage: React.FC = () => {
  const handlePatientCreated = (patientId: string, visitId: string) => {
    // Navigate to walk-in transcription page with proper URL encoding
    window.location.href = `/walk-in/${encodeURIComponent(patientId)}/${encodeURIComponent(visitId)}`;
  };

  const handleBack = () => {
    window.location.href = "/workflow-selector";
  };

  return (
    <WalkInPatientForm 
      onPatientCreated={handlePatientCreated} 
      onBack={handleBack}
    />
  );
};

// Intake Page Component
const IntakePage: React.FC = () => {
  return <Index />;
};

export default App;
