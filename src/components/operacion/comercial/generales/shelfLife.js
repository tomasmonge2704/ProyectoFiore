import { Select } from "@chakra-ui/react"
export const ShelfLife = ({fields, setFields}) => {
    const handleIndexChange = (e) => {
        setFields({ ...fields, shelfLife: e.target.value })
      };
    return (
    <Select  value={fields.shelfLife ? fields.shelfLife : ""} onChange={(e) => handleIndexChange(e)}>
         <option value="" disabled>
       SHELF LIFE
      </option>
        <option value="12 Meses">12 Mounths</option>
        <option value="18 Meses">18 Mounths</option>
        <option value="24 Meses">24 Mounths</option>
      </Select>
    )
}