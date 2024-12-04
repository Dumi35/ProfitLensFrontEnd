import React from 'react';
import { Dialog, DialogContent, Button, TextField, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '@profitlens/config';

type DialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (response: any) => void; // Callback to send the response back
};

const FeaturesFormDialog: React.FC<DialogProps> = ({ open, onClose, onSubmit }) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData)
            console.log('json', formJson)
            const response = await axios.post(`${SERVER_URL}/predict`, formJson);
            // console.log('python',response)
            onSubmit(response.data); // Pass the response back to the parent
            onClose(); // Close the dialog
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>

            <DialogContent>
                <>
                    <Stack gap={2} alignItems={"center"} paddingInline={"4vw"} component={'form'} onSubmit={handleSubmit}>
                        <Typography variant="h4" textAlign={"center"}>Features Form</Typography>
                        <TextField
                            label="Gross Profit"
                            name="GP"
                            placeholder="Enter Gross Profit"
                            fullWidth
                            variant="outlined"
                            required
                        />

                        <TextField
                            label="EBITDA"
                            name="EBITDA"
                            placeholder="Enter EBITDA"
                            fullWidth
                            variant="outlined"
                            required
                        />

                        <TextField
                            label="Current Ratio"
                            name="CR"
                            placeholder="Enter Current Ratio"
                            fullWidth
                            variant="outlined"
                            required
                        />

                        <TextField
                            label="Market Cap (in B USD)"
                            name="MC"
                            placeholder="Enter Market Cap"
                            fullWidth
                            variant="outlined"
                            required
                        />


                        <TextField
                            label="Number of Employees"
                            name="Emp"
                            placeholder="Enter Number of Employees"
                            fullWidth
                            variant="outlined"
                            required
                        />
                        <Button type='submit' variant='contained' color="primary">
                            Submit
                        </Button>
                    </Stack>
                </>
            </DialogContent>
        </Dialog>
    );
};

export default FeaturesFormDialog;
