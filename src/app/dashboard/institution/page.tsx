"use client";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { useState, type FC } from "react";
import { InstitutionsFilter } from "@/common/interfaces/client";
import { useGetInstitutions } from "@/common/hooks/api/useGetInstitutions";
import List from "@/common/components/List";
import Link from "next/link";

const Institutions: FC = () => {
  const [filtersDropdownOpen, setFiltersDropdownOpen] =
    useState<boolean>(false);
  const [filters, setFilters] = useState<InstitutionsFilter>({
    name: undefined,
  });
  const [name, setName] = useState<string>("");
  const { institutions, query } = useGetInstitutions(filters);
  return (
    <div>
      <h1 className="mb-8">Institutions</h1>
      <div className="flex items-center gap-2">
        <Button variant={"default"}>
          <FontAwesomeIcon icon="plus" />
        </Button>
        <DropdownMenu
          open={filtersDropdownOpen}
          onOpenChange={setFiltersDropdownOpen}
        >
          <DropdownMenuTrigger className="outline-none">
            <button className="rounded-md border-[1px] border-gray-300 bg-gray-200 p-2">
              Filtry
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col gap-4 rounded-md bg-white p-2 shadow-md">
              <ul className="flex flex-col gap-2">
                <li>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-200 outline-none"
                    placeholder="Jméno instituce"
                  />
                </li>
              </ul>
              <Button
                onClick={() => {
                  setFilters({ name });
                  setFiltersDropdownOpen(false);
                }}
                variant={"primary"}
              >
                Aplikovat
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-12">
        <div className="flex flex-col gap-4">
          <List
            items={institutions}
            render={(items: ) =>
              items.map((i: Institution) => (
                <Link href={`/dashboard/institution/${i.id}`} key={i.id}>
                  <div className="rounded-md">
                    <p>{i.name}</p>
                  </div>
                </Link>
              ))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Institutions;
