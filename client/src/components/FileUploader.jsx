import axios from 'axios';
import { useState } from 'react';
import PaymentTable from './PaymentTable';

const client = axios.create({
    baseURL: "http://localhost:8080",
});

export default function FileUploader() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
    const [subscriptions, setSubscriptions] = useState(null);

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    async function handleFileUpload() {
        if (!file) return;

        setStatus('uploading');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await client.post("/upload-pdf", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });



            setSubscriptions(response.data.result);

            setStatus('success');
        } catch {
            setStatus('error');
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />


            {file && status !== 'uploading' && (
                <button onClick={handleFileUpload}>Upload</button>
            )}


            {status === 'uploading' && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="spinner" />
                </div>
            )}

            {status === 'success' && (
                <p className="text-sm text-green-600">File uploaded successfully!</p>
            )}

            {status === 'error' && (
                <p className="text-sm text-red-600">Upload failed. Please try again.</p>
            )}

            {subscriptions && subscriptions.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PaymentTable subscriptions={subscriptions} />
                </div>

            )}

        </div>
    );
}
