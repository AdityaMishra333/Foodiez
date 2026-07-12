const router = require("express").Router()
const MenuDetails = require("../models/menu")
const OfferDetails = require("../models/offer")

router.post('/', async (req, res) => {
    try {
        const userMessage = req.body.question

        const items = await MenuDetails.find().lean()

        const menuText = items.length
            ? items.map(item => `- ${item.name} | ₹${item.price} | ${item.category} | ${item.type}`).join("\n")
            : "No items are currently available."

        const offers = await OfferDetails.find().lean()

        const offerText = offers.length
            ? offers.map(offer => {
                const parts = []
                if (offer.discountPercent) parts.push(`${offer.discountPercent}% off`)
                if (offer.freeItem) parts.push(`free ${offer.freeItem}`)
                if (offer.applicableOn) parts.push(`on ${offer.applicableOn}`)
                if (offer.minimumOrderValue) parts.push(`min order ₹${offer.minimumOrderValue}`)
                if (offer.specialOccasion) parts.push(`(${offer.specialOccasion})`)
                return `- ${parts.join(", ")}`
            }).join("\n")
            : "No offers are currently available."

        const systemPrompt = `You are Foodiez's helpful assistant. Answer ONLY using the menu and offers below, which are pulled live from the Foodiez database. Do not invent items, prices, or offers that aren't listed.

MENU:
${menuText}

ACTIVE OFFERS:
${offerText}

Rules:
- Answer dish, price, category, and veg/nonveg questions strictly from the MENU above.
- Answer discount, deal, and free-item questions strictly from the ACTIVE OFFERS above.
- If an item or offer is not in the lists, say it's not available right now instead of guessing.
- For order tracking or account questions, tell the user to check the "Track Order" page.
- Keep answers short, friendly, and focused on helping the user decide what to order.
- If you don't know something, say "Please call us for that, I'm not sure." Never make up information.`

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ]
            })
        })

        const data = await response.json()

        if (data.error) {
            console.error("Groq error:", data.error)
            return res.json({ reply: "Sorry, AI service issue. Try later." })
        }

        const botReply = data.choices[0].message.content

        res.json({ reply: botReply })

    } catch (err) {
        console.error(err)
        res.status(500).json({ reply: "Sorry, some error occured" })
    }
})

module.exports = router