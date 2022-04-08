import Table from './common/Table'
import DeleteButton from './DeleteButton'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import GoldMemberIcon from './GoldMemberIcon'

const CustomersTable = ({
	Customers,
	onSort,
	selectedSort,
	deleteCustomer
}) => {
	let auth = useAuth()
	const columns = [
		{
			value: 'name',
			label: 'Name',
			content: (customer) =>
				auth.user && auth.user.isAdmin ? (
					<Link to={customer._id}>{customer.name}</Link>
				) : (
					<span>{customer.title}</span>
				)
		},
		{ value: 'phone', label: 'Phone' },
		{
			key: 'isGold',
			value: 'isGold',
			label: 'Gold Member',
			content: (customer) => {
				return customer.isGold ? <GoldMemberIcon /> : null
			}
		}
	]
	const authOnlyColumns = [
		{
			key: 'delete',
			content: (customer) => (
				<DeleteButton
					onClick={() => {
						deleteCustomer(customer._id)
					}}
				/>
			)
		}
	]
	return (
		<Table
			data={Customers}
			columns={
				auth.user && auth.user.isAdmin
					? columns.concat(authOnlyColumns)
					: columns
			}
			selectedSort={selectedSort}
			onSort={onSort}
		/>
	)
}

export default CustomersTable