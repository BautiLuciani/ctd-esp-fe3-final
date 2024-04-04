import {render, screen} from "@testing-library/react";
import HomePage from "./index.page";

describe('IndexPage', () => {
    describe('when rendering default', () => {
        it('should render the title', () => {
            render(<HomePage comics={[]} total={0}/>)
            const title = screen.getByText('Sample')
            expect(title).toBeInTheDocument()
        })
    })

})