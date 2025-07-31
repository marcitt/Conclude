import { useState } from "react";
import axios from "axios";

import FileUploader from "../components/FileUploader";

export default function AccountIdentification() {
    return (
        <div className="appcontent">
            <h1>Identify Accounts</h1>
            <p>To Begin Cancelling Accounts Upload Recent Bank Statement:</p>

            <FileUploader></FileUploader>
        </div>
    );
}