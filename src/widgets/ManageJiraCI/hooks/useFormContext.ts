import { useFormContext as _useFormContext } from "../../../providers/Form/hooks";
import { ManageJiraCIFormDataContext } from "../types";

export const useFormContext = () => {
    return _useFormContext<ManageJiraCIFormDataContext>();
}