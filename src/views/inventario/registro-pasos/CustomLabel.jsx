import { Check, X } from 'react-feather'
import { Label } from 'reactstrap'
export const CustomLabel = ({ htmlFor }) => {
    return (
        <Label className='form-check-label' htmlFor={htmlFor}>
            <span className='switch-icon-left'>
                <Check size={14} />
            </span>
            <span className='switch-icon-right'>
                <X size={14} />
            </span>
        </Label>
    )
}