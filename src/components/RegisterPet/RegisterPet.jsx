import React, { useCallback, useState } from "react";
import { UseHistory } from "../../hooks/useHistory";
import { useUser } from "../../hooks/UserProvider";
import DropImage from "../DropImage/DropImage";
import { ButtonHome, RegisterPetsForm } from "./Style";

function RegisterPet ()
{  
    const { addUserPets, loggedUser } = useUser();

    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petAge, setPetAge] = useState(0);
    const [petWeight, setPetWeight] = useState(0);
    const [petRaca, setPetRaca] = useState("");
    const [petImage, setPetImage] = useState(null);
    const [message, setMessage] = useState("");

    const history = UseHistory();

    const handlePetData = useCallback ( async (event) =>
    {
        event.preventDefault();

        const petData = {};
    
        petData.name = petName;
        petData.type = petType;
        petData.age = petAge;
        petData.weight = petWeight;
        petData.raca = petRaca;
        petData.image = petImage;

        const userId = loggedUser.id;
            
        setMessage("Amiguinho cadastrado com sucesso!");
        await addUserPets(petData, userId);
        
    }, [petName, petType, petAge, petWeight, petRaca]);

    const getBase64 = useCallback( (file) =>
    {
        return new Promise((resolve) => 
        {
            const reader = new FileReader();
      
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
    });

    const handleFileUpload = useCallback( async (file) =>
    {
        const base64 = await getBase64(file);

        setPetImage(base64);
    }, [getBase64]);

    return (
        <>
            <div>
                <h1>Adicionar novo amiguinho</h1>

                <form onSubmit={handlePetData}>

                    <RegisterPetsForm>
                        <input 
                            type="text"
                            placeholder="Nome"
                            required autoFocus
                            onChange={ (event) => { setPetName(event.target.value); }}
                            data-testid="test-pet-name"/>

                        <input 
                            type="number"
                            name="petAge"
                            id="age-pet"
                            min="0"
                            step="1"
                            placeholder="Idade do amiguinho em anos completos"
                            required
                            onChange={ (event) => { setPetAge(event.target.value); }}
                            data-testid="test-pet-age"/>

                        <input 
                            type="text"
                            name="petType"
                            id="type-pet"
                            placeholder="Tipo"
                            required
                            onChange={ (event) => setPetType(event.target.value)}
                            data-testid="test-pet-type"/>  

                        <input 
                            type="number"
                            name="petWeight"
                            id="weight-pet"
                            placeholder="Peso do amiguinho em quilos"
                            min="0"
                            step=".1"
                            required
                            onChange={ (event) => { setPetWeight(event.target.value); } } 
                            data-testid="test-pet-weight"/>  

                        <input
                            type="text"
                            name="petRaca"
                            id="raca-pet"
                            placeholder="Raça"
                            onChange={ (event) => { setPetRaca(event.target.value); } }
                            data-testid="test-pet-raca"/>

                        <div className="dropzone-container">

                            <section className="image-container">
                                {petImage && <img src={petImage} alt={petName} /> }
                            </section>

                            <DropImage 
                                data-testid="test-upload-file"
                                onFileUploaded={ handleFileUpload }/>
                        </div>


                        <div className="block-with-message">
                            { message ? <p className="error-message">{message}</p> : ""}
                            <button
                                type="submit"
                                data-testid="test-pet-register-button">Cadastrar amiguinho</button>
                        </div>
                    </RegisterPetsForm>
                </form>
            </div>

            <ButtonHome>
                <p
                    onClick={ () => history.goBack() }
                    data-testid="test-go-back-button">Voltar</p>
            </ButtonHome>
        </>
    );
}

export default RegisterPet;
