import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { checkmarkCircleSharp, cameraSharp, locateSharp, closeCircleSharp, save, hammer } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { PositionOptions } from '@capacitor/geolocation';
import { saveProblem, IProblem, saveImageProblem } from '../services/curio-api';
interface IProps {
    isOpenModal: boolean,
    setIsOpenModal: any
}

interface ILocation {
    latitude: number,
    longitude: number
}
function FormProblem({ isOpenModal, setIsOpenModal }: IProps) {
    const [isOkayPhoto, setIsOkayPhoto] = useState(false)
    const [isOkayGeolocation, setIsOkayGeolocation] = useState(false)
    const [isOkayDescription, setIsOkayDescription] = useState(false)
    const [isOkayAddress, setIsOkayAddress] = useState(false)
    const [isOkayReporterName, setIsOkayReporterName] = useState(false)
    const [image, setImage] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<ILocation>({latitude: 0, longitude: 0});
    const [description, setDescription] =  useState<string | undefined>(" ");
    const [address, setAddress] = useState("");
    const [reportName, setReportName] = useState("");
    const input = useRef<HTMLIonInputElement>(null);

    async function takePicture() {
        const image: Photo  = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
        })
        console.log('[takePicture] - image', image)
        if (image) {
            setIsOkayPhoto(true)
            setImage(image.base64String);
        }
    }

    async function currentPosition() {
        const options: PositionOptions = {
            enableHighAccuracy: true
        }
        const coordinates = await Geolocation.getCurrentPosition(options);
        setIsOkayGeolocation(true)
        setLocation({latitude: coordinates.coords.latitude, longitude: coordinates.coords.longitude})
        console.log('Current position:', coordinates);
    };

    function validationDescription(event: any) {
        const description = event.target.value;
        console.log('[validationDescription] -> event')
        if (description.length > 10) {
            setIsOkayDescription(true)
            setDescription(description)
        } else {
            setIsOkayDescription(false)
        }
    }

    function validationAddress(event: any) {
        const address = event.target.value;
        console.log('[validationAddress] -> event')
        if (address.length > 5) {
            setIsOkayAddress(true)
            setAddress(address)
        } else {
            setIsOkayAddress(false)
        }
    }

    function validationReportName(event: any) {
        const reportName = event.target.value;
        console.log('[validationDescription] -> event')
        if (reportName.length > 3) {
            setIsOkayReporterName(true)
            setReportName(reportName)
        } else {
            setIsOkayReporterName(false)
        }
    }

    async function saveAction() {
        if(isOkayAddress && isOkayDescription && isOkayGeolocation && isOkayPhoto && isOkayReporterName) {
            console.log('[saveAction] -> ')
            const problem = await saveProblem({
                description: description,
                address: address,
                reporterName: reportName,
                longitude: `${location.longitude}`,
                latitude:  `${location.latitude}`
            });
            if(problem === 'error_api') {
                alert('Houve um problema!')
                return
            }
            console.log('[saveAction] -> problem', problem)
            const imageResult = await saveImageProblem(problem.uuid, `${image}`);
            console.log('[saveAction] -> imageResult', imageResult)
            setIsOkayAddress(false)
            setIsOkayDescription(false)
            setIsOkayGeolocation(false)
            setIsOkayReporterName(false)
            setIsOkayPhoto(false)
            setIsOkayGeolocation(false)
            setAddress("")
            setDescription("")
            setReportName("")
            setImage("")
            setLocation({latitude: 0, longitude: 0})
            setIsOpenModal(false)
            alert('Registro realizado com sucesso!')
        } else {
            alert('Por favor preencher campos!')
        }
    }

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
                    <IonButton slot='end' onClick={saveAction}>
                        Salvar <IonIcon slot='end' icon={save}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonInput type='text' value={description} onChange={validationDescription} onInput={validationDescription} placeholder="Descrição do problema">Descrição:</IonInput>
                        {
                            isOkayDescription ?
                                <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                                :
                                <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                    </IonItem>
                    <IonItem>
                        <IonInput onChange={validationAddress} onInput={validationAddress} placeholder="EX: Super Mercado do Bairro">Ponto de referência: </IonInput>
                        {
                            isOkayAddress ?
                                <IonIcon slot='end' icon={checkmarkCircleSharp} color="success"></IonIcon>
                                :
                                <IonIcon slot='end' icon={closeCircleSharp} color="danger"></IonIcon>
                        }
                    </IonItem>
                    <IonItem>
                        <IonInput onChange={validationReportName} onInput={validationReportName} placeholder="João de Jesus">Seu nome: </IonInput>
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