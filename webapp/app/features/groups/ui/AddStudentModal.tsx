import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { getStudentsToApplyToGroup } from '@/entities/group/api/getStudentsToApplyToGroup';
import { trpcClient } from '@/lib/trpcClient';
import { useQuery } from '@tanstack/react-query';
import AddStudentForm from './AddStudentForm';

interface Props {
    groupId: number;
    onClose: () => void;
}

function AddStudentModal({ groupId, onClose }: Props) {
    const { isLoading, data: students } = useQuery(getStudentsToApplyToGroup(groupId, trpcClient));

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Dodaj studenta do grupy</DialogTitle>
                </DialogHeader>
                {isLoading && !students ? (
                    <div className="flex justify-center w-full">
                        <Spinner />
                    </div>
                ) : (
                    <AddStudentForm students={students ?? []} groupId={groupId} onClose={onClose} />
                )}
            </DialogContent>
        </Dialog>
    );
}
export default AddStudentModal;
