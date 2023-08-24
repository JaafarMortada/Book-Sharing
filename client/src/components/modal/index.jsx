import ReactModal from 'react-modal';
import "./styles.css"
import AddBookFromModal from './addRecipeModalContent';

const RecipeModal = ({toggleModal, isOpen, data, from}) => {
    return ( 
        <ReactModal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex:'998'
                    },
                    content: {
                        position: 'absolute',
                        top: '40px',
                        left: '275px',
                        right: '275px',
                        bottom: '40px',
                        border: '1px solid rgb(82, 171, 152)',
                        background: '#F3F3F3',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        zIndex:'999',
                        minWidth: '600px'
                    }
                }}
                
            >
                {/* {(from === "card") ? <RecipeInfoModalContent data={ data } commentsCallback={commentsCallback}/> : null} */}
                {(from === "addPost") ? <AddBookFromModal/> : null}
                {/* {(from === "addCalenderEvent") ? <AddCalenderEvent/> : null } */}
            </ReactModal>
    );
}

export default RecipeModal;