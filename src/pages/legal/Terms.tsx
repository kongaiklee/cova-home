import body from '../../content/legal/terms.md?raw';
import LegalPage from './LegalPage';

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      description="The terms that apply when you use Covarage and covarage.com."
      path="/terms"
      body={body}
    />
  );
}
