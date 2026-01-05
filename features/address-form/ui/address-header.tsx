export const AddressHeader = ({
	title,
	description,
}: {
	title: string
	description: string
}) => (
	<div>
		<h1 className='text-3xl font-extrabold tracking-tight'>{title}</h1>
		<p className='text-muted-foreground mt-2'>{description}</p>
	</div>
)
