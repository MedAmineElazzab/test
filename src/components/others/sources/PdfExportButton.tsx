import { Button, PdfIcon } from "@/components";
import { clsx } from "@mantine/core";

interface PdfExportButtonProps {
 
}

export function PdfExportButton(props: PdfExportButtonProps) {

  const classNames = clsx({
    " p-0 m-0 hover:bg-transparent": true,
  });

  return (
    <Button
      
      className={classNames}
    >
      <PdfIcon className="w-4 h-4" />
    </Button>
  );
}
