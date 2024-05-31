import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find whatever it was you were looking for. Are you sure the Vendor file you need is where it's supposed to be?</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}