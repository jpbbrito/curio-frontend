import { IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuToggle, IonButton, IonContent, IonModal, IonButtons } from '@ionic/react';

interface IProps {
  setIsOpenModal: any
}

function SideMenu({ setIsOpenModal}: IProps) {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Projeto Curió</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonMenuToggle>
          <IonButton shape='round' expand='full'>Login</IonButton>
          <IonButton shape='round' expand='full' fill='outline' onClick={() => setIsOpenModal(true)}>Registrar Problema</IonButton>
          <IonButton shape='round' expand='full' fill='outline'>Registrar Solução</IonButton>
        </IonMenuToggle>
    
      </IonContent>
      <IonButton shape='round' color="danger">Sair</IonButton>
    </IonMenu>
  )
}

export default SideMenu;