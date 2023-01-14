import { createContext, useContext, useState } from "react"

const BookSelectionContext = createContext();


const BookSelectionProvider = ({children}) => {
    const [selectedBookReview, setSelectedBookReview] = useState();
    return (
        <BookSelectionContext.Provider
            value={{
                selectedBookReview,
                setSelectedBookReview
            }}
        >
            {children}
        </BookSelectionContext.Provider>
    )
}

const useBookSelectionContext = () => {
    const context = useContext(BookSelectionContext);
    if (context === undefined) {
        throw new Error('useBookSelectionContext must be used within a BookSelectionProvider')
      }
    return context;
}

export {BookSelectionProvider, useBookSelectionContext}