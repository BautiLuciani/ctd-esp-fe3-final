import {fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
jest.mock("dh-marvel/components/faqs/faqsData.ts");
jest.mock("dh-marvel/pages/api/preguntas-frecuentes/index.route.ts");
import '@testing-library/jest-dom/extend-expect';
import FaqsPage from "./preguntas-frecuentes.page";

interface Pregunta {
    id: number;
    question: string;
    answer: string;
};

const pregunta: Pregunta[] = [
    { id: 1, question: 'Question 1', answer: 'Answer 1' },
    { id: 12, question: 'Question 2', answer: 'Answer 2' },    
];

describe('Tests en FaqsPage', () => {

    test('renderizar las preguntas correctamente', async () => {
        render(<FaqsPage faqs={pregunta} />);
        expect(screen.getByText('Question 2')).toBeInTheDocument();
        expect(screen.getByText('Answer 2')).toBeInTheDocument();
    });   

    test('expandir el acordeon creado con MUI', async () => {
        render(<FaqsPage faqs={pregunta} />);
        
        const accordionButton = screen.getByText('Question 1');        
        fireEvent.click(accordionButton);
        
        const answerElement = screen.getByText('Answer 1');
        expect(answerElement).toBeInTheDocument();
    });   

    test('renderizar el titulo, puede ser en caso de no pasarle las preguntas', async () => {
        render(<FaqsPage faqs={[]} />);
        
        const pageTitle = screen.getByText('FAQS');
        expect(pageTitle).toBeInTheDocument();
    });    

    
});