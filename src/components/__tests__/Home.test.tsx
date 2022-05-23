import {fireEvent, render, screen} from "@testing-library/react";
import Home from "../Home";

jest.mock("react-router-dom", ()=> {
    return {
        useNavigate: jest.fn(),
    };
});

describe("Home", ()=> {
    it("renders without crash", ()=>{
        render(<Home/>);
    });

    it("matches snapshot", ()=> {
        const tree = render(<Home/>);
        expect(tree).toMatchSnapshot();
    });

    it("has button disabled", ()=> {
        render(<Home/>);
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton);
        expect(submitButton).toBeDisabled();
    });

    it("has button enabled on inout", ()=>{
        render(<Home/>);
        const input = screen.getByRole("input");
        fireEvent.change(input, { target: { value: "test" } });
		const submitButton = screen.getByRole("button");
		expect(submitButton).not.toBeDisabled();
    })
})
