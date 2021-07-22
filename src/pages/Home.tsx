import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { formatDate } from './date';
import EntryPage from './EntryPage';
import './Home.css';

const Home: React.FC = () => {
  const {userId} = useAuth();
  const [entries,setEntries] = useState<Entry[]>([]);
  useEffect(()=>{
    const entriesRef = firestore.collection("users").doc(userId).collection("entries");
    return entriesRef.orderBy('date','desc').limit(7)
      .onSnapshot(({docs})=>setEntries(docs.map(toEntry)))
    //entriesRef.get().then(({docs})=>setEntries(docs.map(toEntry)))
  },[userId])
  console.log('[HomePage] rendered entries', entries);
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {entries.length==0 && 
          <IonLabel color="primary">No data</IonLabel>
        }
        <IonList>
          {entries.map((entry)=>
            <IonItem button routerLink={`/my/entries/view/${entry.id}`}>
              <IonThumbnail slot="end">
                <IonImg src={entry.pictureURL}></IonImg>
              </IonThumbnail>
              <IonLabel>
                  <h4>{formatDate(entry.date)}</h4>
                  <h5>{entry.title}</h5>
              </IonLabel>
            </IonItem>
         )}
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton routerLink="/my/entries/add">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
