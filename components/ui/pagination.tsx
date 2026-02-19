"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";

type PaginationProps = {
  totalPages: number;
  pageParamName?: string;
};

export function Pagination({ totalPages, pageParamName = "page" }: PaginationProps) {
  const [page, setPage] = useQueryState(pageParamName, { defaultValue: "1" });
  const currentPage = parseInt(page);

  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((currentPage - 1).toString())}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="text-sm">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((currentPage + 1).toString())}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 