import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import ModalAddCategory from "./modal-add-category";
import GetCategory from "../hooks/get-category";
import { AlertDelete } from "./alert-delete";
import { Badge } from "../ui/badge";

export default function ModalCategory({ triger }: { triger: ReactNode }) {
  const { categories, isPending } = GetCategory();

  if (isPending) {
    return "loading...";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Manage your transaction categories. Categories currently in use
            cannot be deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-2">
            {categories?.map((category) => {
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {category.name}
                    </span>
                    <Badge variant="secondary" className="mt-2">{category.type}</Badge>
                  </div>

                  <AlertDelete
                    id={category.id || ""}
                    url="categories"
                    invalidate="category"
                    trigger={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              );
            })}
          </div>
          {categories?.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No categories yet. Please add a new category first.
            </div>
          )}
        </div>
        <DialogFooter>
          <ModalAddCategory
            triger={
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
