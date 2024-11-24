import { Spinner } from './spinner';

export default function FullscreenSpinner() {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <Spinner size="large" />
        </div>
    );
}
