"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/*
 * ConfirmDestructive pattern
 *
 * For irreversible actions at meaningful stakes (releasing funds, closing a
 * cycle, archiving an audit pack). Requires the operator to type a match
 * string before the primary confirm enables. Match is exact, mono-rendered
 * so a stray space stands out.
 *
 *   <ConfirmDestructive
 *     trigger={<Button>Release funds</Button>}
 *     title="Confirm settlement, cycle 4271"
 *     description="Releasing $127,492,851.50 to 38 counterparties. Recorded in the audit log and cannot be reversed."
 *     confirmToken="4271"
 *     tokenLabel="Type the cycle number to confirm"
 *     confirmLabel="Release funds"
 *     onConfirm={() => releaseCycle(4271)}
 *   />
 *
 * Voice convention for the description: what is moving, where, how many,
 * and the irreversibility. Be plain. Do not soften.
 */

type ConfirmDestructiveProps = {
  trigger: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  confirmToken: string;
  tokenLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
};

export function ConfirmDestructive({
  trigger,
  title,
  description,
  confirmToken,
  tokenLabel,
  confirmLabel = "Confirm",
  onConfirm,
}: ConfirmDestructiveProps) {
  const [typed, setTyped] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const matched = typed.trim() === confirmToken.trim();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setTyped(""); // reset the match field when the dialog closes
  };

  const handleConfirm = () => {
    if (!matched) return;
    onConfirm?.();
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-1 space-y-2">
          <Label htmlFor="confirm-destructive-input">
            {tokenLabel ?? (
              <>
                Type{" "}
                <span className="font-mono text-foreground">
                  {confirmToken}
                </span>{" "}
                to confirm
              </>
            )}
          </Label>
          <Input
            id="confirm-destructive-input"
            mono
            autoComplete="off"
            spellCheck={false}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={confirmToken}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={!matched} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
