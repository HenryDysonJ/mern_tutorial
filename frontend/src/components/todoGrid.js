
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '../assets/delete-icon.svg';
import EditIcon from '../assets/edit-icon.svg';
import { deleteGoal, getAllGoal, getByIdGoal } from '../feature/goal/goalSlice';
import { toast } from 'react-toastify';

const TodoGrid = () => {
    const { goals } = useSelector((state) => state.goal)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGoal());
    }, [dispatch]);

    const handleEdit = (val) => {
        dispatch(getByIdGoal(val._id))
    };

    const handleDelete = async (val) => {
        try {
            const result = await dispatch(deleteGoal(val?._id)).unwrap();
            toast.success(result.message);
            dispatch(getAllGoal());
        } catch (error) {
            toast.error(typeof error === 'string' ? error : error?.message || 'Something went wrong');
        }
    };

    return (
        <div className="grid-container">
            <h1 className="form-header text-red-50">
                Store List
            </h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Product Name</th>
                        <th>Feedbacks</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {goals?.data?.map((todo, index) => (
                        <tr key={todo.id}>
                            <td>{index + 1}</td>
                            <td>{todo.text}</td>
                            <td>{todo.feedback}</td>
                            <td>
                                <div className="action-icons">
                                    <img
                                        src={EditIcon}
                                        alt="Edit"
                                        className="action-icon"
                                        onClick={() => handleEdit(todo)}
                                    />

                                    <img
                                        src={DeleteIcon}
                                        alt="Delete"
                                        className="action-icon"
                                        onClick={() => handleDelete(todo)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TodoGrid;
