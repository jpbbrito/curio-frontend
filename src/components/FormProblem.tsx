import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { checkmarkCircleSharp, cameraSharp, locateSharp, closeCircleSharp, save, hammer } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PositionOptions } from '@capacitor/geolocation';
interface IProps {
    isOpenModal: boolean,
    setIsOpenModal: any
}

function FormProblem({ isOpenModal, setIsOpenModal }: IProps) {
    const [isOkayPhoto, setIsOkayPhoto] = useState(false)
    const [isOkayGeolocation, setIsOkayGeolocation] = useState(false)
    const [isOkayDescription, setIsOkayDescription] = useState(false)
    const [isOkayAddress, setIsOkayAddress] = useState(false)
    const [isOkayReporterName, setIsOkayReporterName] = useState(false)

    const input = useRef<HTMLIonInputElement>(null);

    async function takePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
        })
        console.log('[takePicture] - image', image)
        if(image) {
            setIsOkayPhoto(true)
        }
    }

    async function currentPosition() {
        const options: PositionOptions = {
            enableHighAccuracy: true
        }
        const coordinates = await Geolocation.getCurrentPosition(options);
        setIsOkayGeolocation(true)
        console.log('Current position:', coordinates);
      };

    return (
        <IonModal isOpen={isOpenModal}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonButton shape='round' onClick={() => setIsOpenModal(false)}>Fechar</IonButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={hammer}></IonIcon> Registro de Problema
                    </IonTitle>
                    <IonButton slot='end' onClick={() => setIsOpenModal(false)}>
                        Salvar <IonIcon slot='end' icon={save}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonInput>Descrição:</IonInput>
                        {
                            isOkayDescription ?
                            <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                            :
                            <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                    </IonItem>
                    <IonItem>
                        <IonInput>Ponto de referência: </IonInput>
                        {
                            isOkayAddress ?
                            <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                            :
                            <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                    </IonItem>
                    <IonItem>
                        <IonInput>Seu nome: </IonInput>
                        {
                            isOkayReporterName ?
                            <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                            :
                            <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                    </IonItem>
                    <IonItem>
                        Foto:
                        <IonButton onClick={takePicture}>
                            Câmera
                        </IonButton>
                        <IonIcon icon={cameraSharp} color='primary'></IonIcon>
                        {
                            isOkayPhoto ?
                            <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                            :
                            <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                        
                    </IonItem>
                    <IonItem>
                        Geolocalização: 
                        <IonButton onClick={currentPosition}>
                            Localização
                        </IonButton>
                        <IonIcon icon={locateSharp} color='primary'> </IonIcon>
                        {
                            isOkayGeolocation ? 
                            <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                            :
                            <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                        
                    </IonItem>
                </IonList>
            </IonContent>
        </IonModal>
    )
}

export default FormProblem;