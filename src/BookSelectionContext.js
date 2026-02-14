import { createContext, useContext, useState } from "react"

const BookSelectionContext = createContext();

const BookSelectionProvider = ({ children, refreshReviews }) => {
    const [selectedBookReview, setSelectedBookReview] = useState();
    const [editBook, setEditBook] = useState(false);

    return (
        <BookSelectionContext.Provider
            value={{
                selectedBookReview,
                setSelectedBookReview,
                editBook,
                setEditBook,
                refreshReviews,
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

export { BookSelectionProvider, useBookSelectionContext }
