import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactModal from "../react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShippingMethodAPI } from "../../../services/api";
import { toast } from "react-toastify";

type ShippingMethodValues = {
  _id?: string;
  name: string;
  description: string;
  cost: number;
  estimated_days: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editRow: ShippingMethodValues | null; // Sirf editRow pass karein
};

export const EditShippingMethodModal = ({
  isOpen,
  onClose,
  editRow,
}: Props) => {
  const queryClient = useQueryClient();

  // Mutation for updating shipping method
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: ShippingMethodValues;
    }) => updateShippingMethodAPI(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingMethods"] });
      onClose(); // Modal band karein
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    cost: Yup.number().positive().required("Cost is required"),
    estimated_days: Yup.number()
      .integer()
      .positive()
      .required("Estimated days is required"),
  });

  const handleSubmit = async (
    values: ShippingMethodValues,
    { resetForm }: any
  ) => {
    if (!editRow?._id) return; // Ensure we have an ID for update

    try {
      await updateMutation.mutateAsync({
        id: editRow._id,
        values,
      });
      toast.success("Shipping method updated successfully");
      resetForm(); // Form reset karein
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error updating shipping method:", error);
    }
  };

  // Initial values internally manage karein
  const initialValues: ShippingMethodValues = editRow || {
    name: "",
    description: "",
    cost: 0,
    estimated_days: 0,
  };

  return (
    <ReactModal modalIsOpen={isOpen} setIsOpen={onClose}>
      <div className="w-full min-w-[450px] max-w-[550px] p-5">
        <h2 className="text-lg font-semibold mb-4">Edit Shipping Method</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field name="name" className="w-full border p-2 rounded" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <Field
                  name="description"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Cost</label>
                <Field
                  name="cost"
                  type="number"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="cost"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Estimated Days
                </label>
                <Field
                  name="estimated_days"
                  type="number"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="estimated_days"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                // disabled={updateMutation.isPending}
                className="w-full bg-yellow-500 cursor-pointer text-black font-semibold py-2 rounded-lg"
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </ReactModal>
  );
};
