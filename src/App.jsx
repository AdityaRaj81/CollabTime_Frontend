import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout.jsx';
import AuthLayout from './components/layout/AuthLayout.jsx';
import OnboardingLayout from './components/layout/OnboardingLayout.jsx';
import RequireAuth from './components/layout/RequireAuth.jsx';
import LandingPage from './pages/public/LandingPage.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import TermsPage from './pages/public/TermsPage.jsx';
import PrivacyPage from './pages/public/PrivacyPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignUpPage from './pages/auth/SignUpPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';
import VerifyEmailPage from './pages/auth/VerifyEmailPage.jsx';
import CheckEmailPage from './pages/auth/CheckEmailPage.jsx';
import OnboardingStep1Page from './pages/onboarding/OnboardingStep1Page.jsx';
import OnboardingStep2Page from './pages/onboarding/OnboardingStep2Page.jsx';
import OnboardingStep3Page from './pages/onboarding/OnboardingStep3Page.jsx';
import OnboardingCompletePage from './pages/onboarding/OnboardingCompletePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="check-email" element={<CheckEmailPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route element={<OnboardingLayout />}>
          <Route path="onboarding/1" element={<OnboardingStep1Page />} />
          <Route path="onboarding/2" element={<OnboardingStep2Page />} />
          <Route path="onboarding/3" element={<OnboardingStep3Page />} />
          <Route path="onboarding/complete" element={<OnboardingCompletePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
