import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image fluid className="h-25" alt={t('notFoundPage.heading')} src="/images/not-found-avatar.svg" />
      <h1 className="h4 text-muted">{t('notFoundPage.heading')}</h1>
      <p className="text-muted">
        {t('notFoundPage.body')}
        <a href={routes.chatPage()}>{t('notFoundPage.homeLink')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
