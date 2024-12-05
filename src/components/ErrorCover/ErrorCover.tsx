type IErrorCoverProps = {
    message: string;
}

export function ErrorCover({ message }: IErrorCoverProps) {
    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <p className='text-xl text-red-500'>{message}</p>
        </div>
    );
}
