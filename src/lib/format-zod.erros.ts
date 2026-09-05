interface FormatZodErrorsInput {
    error: {
        validationContext?: string,
        validation?: Array<{
            instacePath?: string,
            keywork?: string,
            message?: string,
            params?: {
                type?: string,
                missingProperty?: string
            }
        }>
    }
}

export function formatZodError({error}: FormatZodErrorsInput) {
    const validationContext = error.validationContext || "body"

    const formattedError = {
        message: "Invalid Input",
        validation: [] as Array<{
            field: string,
            message: string,
            code: string,
            context: string
        }>
    }

    if (Array.isArray(error.validation)) {
        for (const issue of error.validation) {

            // regex for remove leading slash
            let field = issue.instacePath?.replace(/^\//, '') || ''

            if (issue.keywork === "invalid_type" && issue.params?.type === "required") {
                field = (issue.params.missingProperty as string) || field
            }

            formattedError.validation.push({
                field,
                message: issue.message || 'Validation error',
                code: issue.keywork || 'Unknown',
                context: validationContext
            })
        }
    }

    return formattedError
}