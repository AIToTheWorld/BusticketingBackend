const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const supabaseUrl = "https://kwyezimolkwsbblpvdgz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eWV6aW1vbGt3c2JibHB2ZGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1Njc1MjQsImV4cCI6MjAwNTE0MzUyNH0.8ca5kXW4qrDkjC_8mLFy36eRgyZcqozI-pVx3W4GUpE";

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/validate-ticket', async (req, res) => {
    try {
        const { tripId } = req.body;
        console.log('Received body:', req.body);
        if (!tripId) return res.status(400).send({ error: 'No trip ID provided' });
        
        
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .eq('trip_id', tripId); // Use the tripId here

        if (error) {
            console.error("Error querying Supabase:", error.message);
            return res.status(500).send({ error: 'Database error' });
        }
        if (!data || data.length === 0) return res.status(404).send({ error: 'Ticket not found' });
        const ticketDetails = data[0];  // Assuming there's only one match for a ticket ID
        res.send({
            message: 'Ticket is valid!',
            ticketDetails
        });
    } catch (err) {
        console.error("Unexpected error in /validate-ticket:", err.message);
        return res.status(500).send({ error: 'Unexpected server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
