import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';


interface RouteParam{
  id: string;
}
const AddEntryPage: React.FC = () => {
  const {userId} = useAuth();
  const history = useHistory();

  const handleSave = async ()=>{
    const entriesRef = firestore.collection('users').doc(userId)
        .collection('entries');
    const entryData = {date,title,pictureURL ,description};
    if (pictureURL.startsWith('blob')) {
      entryData.pictureURL = await savePicture(pictureURL,userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log(entryRef.id);
    history.goBack();
  }
  async function savePicture(blobURL,userId){
    const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}/`);
    const response = await fetch(blobURL);
    const blob = await response.blob();
    const snapshot= pictureRef.put(blob);
    const url = await (await snapshot).ref.getDownloadURL();
    console.log(url);
    return url;

  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const pictureURL = URL.createObjectURL(file);
      setPictureURL(pictureURL);
      console.log('picture url: ',pictureURL);
    }
  }
  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date,setDate] = useState('')
  const [pictureURL, setPictureURL] = useState('/assets/icon/icon.png')
  const fileInputRef = useRef<HTMLInputElement>();
  console.log('[Add Entry] page')
  useEffect(()=>{
    return ()=>{
        if (pictureURL.startsWith('blob:')) {
        URL.revokeObjectURL(pictureURL);
        console.log('Revoke picture url: ',pictureURL);
      }
    }  
  },[pictureURL])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Add Entry page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList> 
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(event)=>setTitle(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel><br/>
            <input type="file" accept='image/*' hidden ref={fileInputRef} onChange={handleFileChange}/>
            <img src={pictureURL} style={{cursor:'pointer'}} alt=''
            onClick={()=>fileInputRef.current.click()}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description} onIonChange={(event)=>setDescription(event.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime value={date} onIonChange={(event)=>setDate(event.detail.value)}/>
          </IonItem>
          <IonButton expand="block" onClick={handleSave} >Save</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
