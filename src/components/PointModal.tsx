import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonText, IonTitle, IonToolbar } from '@ionic/react'

import './PointModal.css';

import { Problem } from '../interfaces/Problems';
import { Image } from '../interfaces/Images';

interface IProps {
    isOpenModal: boolean,
    point: Problem,
    image: Image | undefined,
    setIsOpenModal: any
}
function PointModal({ isOpenModal, point, image, setIsOpenModal}: IProps) {

    return (
        <IonModal isOpen={isOpenModal}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{point.description} </IonTitle>
                    <IonButtons slot='end'>
                        <IonButton shape='round' onClick={() => setIsOpenModal(false)}>Fechar</IonButton>
                    </IonButtons>
                </IonToolbar>
                
                    
            </IonHeader>
            <IonContent className="ion-padding">
            
                {
                    image && point ?
                        <>
                                <p>Endereço: {point.address}</p>
                                <p>Bairro: {point.neighborhood}</p>
    
                            <img className='imagem-modal' src={`data:image/png;base64,${image.base64}`} alt="" />
                        </>
                        :
                        <p> Não existe imagem para essa problema </p>
                }
            </IonContent>
            
        </IonModal>)
}

export default PointModal;