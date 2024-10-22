import axios from "axios";

function fileIsAccepted(fileType: string, allowedTypes: "Images" | "Video" | "PDF" | "WordDocs"[]): boolean {
    const allowedFileDict = {
        Images: "image/jpeg,image/png,image/gif,image/webp",
        Video: "video/mp4,video/mpeg,video/ogg,video/webm",
        PDF: "application/pdf",
        WordDocs: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }
    for (let i = 0; i < allowedTypes.length; i++) {
        if ((allowedFileDict[allowedTypes[i] as keyof {}] as string).includes(fileType)) {
            return true;
        }
    }

    return false;
}

export async function submitPayloadForm(prevState: {
    message: boolean | null,
    error: { message: string, fieldName: string } | null
    fields: any,
    form: null|number
}, formData: FormData) {
    const formDataArr = Array.from(formData);
    const filesToUpload = [];
    for (let i = 0; i < formDataArr.length; i++) {
        const currField = prevState.fields.find((x: any) => x.name === formDataArr[i][0]);
        if (currField.blockType === "FileUpload") {

            const file: File = formDataArr[i][1] as File;
            const maxFileSize = (currField.maxSize || 25) * 1000000;
            if (!currField.required && file.size === 0) {
                continue;
            }
            filesToUpload.push({currField, formData: formDataArr[i]});
            if (maxFileSize < file.size) {
                return {
                    message: null,
                    error: {
                        fieldName: formDataArr[i][0],
                        message: `File is too large. Max upload size for this field is ${currField.maxSize}MB`,
                    },
                    fields: prevState.fields,
                    form: prevState.form,
                }
            }


            if (!fileIsAccepted(file.type, currField.fileTypes)) return {
                message: null,
                error: {
                    fieldName: formDataArr[i][0],
                    message: `This file type is not accepted. Please upload one of the following: ${currField.fileTypes.join(", ")}`,
                },
                fields: prevState.fields,
                form: prevState.form,
            }
        }

    }

    const dataToSend = formDataArr.map((value) => {
        if (typeof value[1] !== "string"){
            return {
                field: value[0],
                value: "upload:-"+value[1].name,
            }
        }
        return {
            field: value[0],
            value: value[1],
        }
    });

    try {

        for (const file of filesToUpload) {
        await axios.postForm(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/userUploadedFormDocuments`, {
            file: file.formData[1],
        }, {headers: {"Content-Type": "multipart/form-data"}});
    }
        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/form-submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: prevState.form,
                submissionData: dataToSend,
            }),
        })
        const data = await res.json();

/*        await axios.post(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/userUploadedFormDocuments`, {
            _payload: JSON.stringify({
                associatedFormSubmission: data.doc.id
            }),
        })*/



        return {
            message: true,
            error: null,
            fields: prevState.fields,
            form: prevState.form
        }

    } catch (err: any) {
        console.warn(err)
        const nodeError: NodeJS.ErrnoException = err
        return {
            message: false,
            error: {
                message: "Something went wrong when submitting the form. Please try again later.",
                fieldName: "all"
            },
            fields: prevState.fields,
            form: prevState.form,
        }
    }
}
