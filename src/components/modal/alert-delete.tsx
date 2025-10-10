import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";

type Delete = {
  id?: number;
  trigger: ReactNode;
  invalidate: string;
  url: string;
  id2?: string;
};

export function AlertDelete({ trigger, id, url, invalidate }: Delete) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation<any, Error, any>({
    mutationKey: ["delete"],
    mutationFn: async () => {
      const response = await api.delete(`/${url}/${id}`);

      return response.data;
    },
    onError: () => {
      toast.error("something wrong");
    },
    onSuccess: async () => {
      toast.success("Deleted");
      await queryClient.invalidateQueries({
        queryKey: [`${invalidate}`],
      });
    },
  });

  const onSubmit = async (data: number) => {
    await mutateAsync(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The selected item will be permanently
            deleted and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onSubmit(id || NaN)}
            disabled={isPending}
            className="hover:bg-red-500 flex items-center justify-center gap-2"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
