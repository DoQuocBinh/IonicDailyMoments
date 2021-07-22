import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        Page not found
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
