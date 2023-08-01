import { Select } from "@chakra-ui/react"
export const ShelfLife = ({purchase, setPurchase}) => {
    const handleIndexChange = (e) => {
        setPurchase({ ...purchase, shelfLife: e.target.value })
      };
    return (
    <Select  value={purchase.shelfLife ? purchase.shelfLife : ""} onChange={(e) => handleIndexChange(e)}>
         <option value="" disabled>
       SHELF LIFE
      </option>
        <option value="12 Meses">12 Meses</option>
        <option value="18 Meses">18 Meses</option>
        <option value="24 Meses">24 Meses</option>
      </Select>
    )
}