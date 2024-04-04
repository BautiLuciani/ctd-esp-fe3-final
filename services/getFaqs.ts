export const getFaqs = async () => {
    try {
        const response = await fetch('https://esp-fe-3-final-marvel.vercel.app/api/preguntas-frecuentes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el fetch de getFaqs:', error);
        throw new Error('Ocurrió un error al obtener los datos en FAQs para preguntas frecuentes');
    }
};
