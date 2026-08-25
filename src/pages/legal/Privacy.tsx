import body from '../../content/legal/privacy.md?raw';
import LegalPage from './LegalPage';

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Covarage collects, uses and protects personal data, under Singapore's PDPA."
      path="/privacy"
      body={body}
    />
  );
}
