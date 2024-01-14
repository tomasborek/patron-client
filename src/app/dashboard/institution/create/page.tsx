"use client";
import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Jméno musí být delší než 3 znaky" })
      .max(255, { message: "Jméno musí být kratší než 255 znaků" }),
  })
  .strict();
const CreateInstitution = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <div className="w-full">
      <h2 className="mb-12">Vytvořit instituci</h2>
      <div className="flex w-full flex-col items-center">
        <Form {...form}>
          <form className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Jméno</FormLabel>
                  <FormControl>
                    <Input placeholder="Název instituce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button></Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateInstitution;
