import { IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuToggle, IonButton, IonContent } from '@ionic/react';

function SideMenu() {

    return (
        <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Projeto Curió</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonButton shape='round' expand='full' fill='outline'>Problemas</IonButton>
            <IonButton shape='round' expand='full' fill='outline'>Soluções</IonButton>
          </IonMenuToggle>
          
        </IonContent>
        <IonButton shape='round' color="danger">Sair</IonButton>
      </IonMenu>
    )
}

export default SideMenu;