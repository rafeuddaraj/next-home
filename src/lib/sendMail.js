import emailjs from '@emailjs/browser';
export const sendMail = (templateParams) => {

    emailjs.send('service_rmbwo9c', 'template_pc4o4ls', templateParams, { publicKey: 'iOdP3aXdhL6nMD-pG' }).then(
        () => {
            // 
            // console.log('SUCCESS!', response.status, response.text);
        },
        () => {
            // 
            // console.log('FAILED...', error);
        },
    );
}

