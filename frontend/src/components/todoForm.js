
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoal, createdGoal, updateGoal } from '../feature/goal/goalSlice'
import { toast } from 'react-toastify';

const TodoForm = () => {
    const dispatch = useDispatch();
    const { formData, isLoading } = useSelector((state) => state.goal)
    const [todoDetails, setTodoDetails] = useState({
        customerName: '',
        feedback: '',
        id: ""
    });

    const { customerName, feedback, id } = todoDetails;

    const handleChange = (key, value) => {
        setTodoDetails(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customerName || !feedback) {
            return toast.warning('All feilds are required.')
        }
        const payload = { text: customerName, feedback }

        try {
            const result = todoDetails.id
                ? await dispatch(updateGoal({ ...payload, id })).unwrap()
                : await dispatch(createdGoal(payload)).unwrap();

            toast.success(result.message);
            setTodoDetails({ customerName: "", feedback: "", id: "" });
            dispatch(getAllGoal());
        } catch (error) {
            toast.error(typeof error === 'string' ? error : error?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        setTodoDetails({
            customerName: formData?.data?.text,
            feedback: formData?.data?.feedback,
            id: formData?.data?._id
        })
    }, [formData])

    return (
        <div className="form-containerl">
            <h1 className="form-header text-red-50">
                Store Details
            </h1>

            <Form className="form-body" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        value={todoDetails.customerName}
                        onChange={(e) =>
                            handleChange('customerName', e.target.value)
                        }
                        type="text"
                        placeholder="Enter customer name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control
                        value={todoDetails.feedback}
                        onChange={(e) =>
                            handleChange('feedback', e.target.value)
                        }
                        placeholder="Enter Feedback"
                        as="textarea"
                        rows={1}
                    />
                </Form.Group>

                <Button
                    className="mt-3"
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : todoDetails?.id ? 'Update' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
};

export default TodoForm;
