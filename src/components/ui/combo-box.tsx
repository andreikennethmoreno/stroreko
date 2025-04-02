"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const plantCategories = [
  { value: "", label: "None" },
  { value: "Indoor", label: "Indoor" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Succulent", label: "Succulent" },
  { value: "Flowering", label: "Flowering" },
  { value: "Herb", label: "Herb" },
  { value: "Fern", label: "Fern" },
  { value: "Tree", label: "Tree" },
  { value: "Shrub", label: "Shrub" },
];

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {plantCategories.map((cat) => (
                <CommandItem
                  key={cat.value}
                  value={cat.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {cat.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}