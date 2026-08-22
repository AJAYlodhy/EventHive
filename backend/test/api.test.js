const assert = require('assert');
const http = require('http');
const app = require('../server');

const PORT = 5098;
let server;
let alexToken;
let sarahToken;
let testEventId;

function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (data) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path,
        method,
        headers,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve({ status: res.statusCode, body: parsed });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );

    req.on('error', reject);
    if (data) {
      req.write(postData);
    }
    req.end();
  });
}

async function runComprehensiveTests() {
  console.log('====================================================');
  console.log('🧪 EVENTHIVE ORGANIZER MODULE COMPREHENSIVE TEST SUITE');
  console.log('====================================================\n');
  process.env.NODE_ENV = 'test';

  server = app.listen(PORT);

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`• ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log('❌ FAILED');
      console.error('   Error:', err.message);
      failed++;
    }
  }

  try {
    // 1. Health check
    await test('Server Health Check (GET /api/health)', async () => {
      const res = await request('GET', '/api/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'online');
    });

    // 2. Authentication: Standard Login
    await test('Organizer Standard Login (POST /api/auth/login)', async () => {
      const res = await request('POST', '/api/auth/login', {
        email: 'alex.organizer@eventhive.com',
        password: 'organizer123',
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.token);
      assert.strictEqual(res.body.user.role, 'organizer');
      alexToken = res.body.token;
    });

    // 3. Authentication: Invalid Password Rejection
    await test('Invalid Password Rejection (POST /api/auth/login)', async () => {
      const res = await request('POST', '/api/auth/login', {
        email: 'alex.organizer@eventhive.com',
        password: 'wrongpassword',
      });
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 4. Authentication: Demo Login for Alex & Sarah
    await test('Demo Login Switcher (POST /api/auth/demo-organizer)', async () => {
      const res = await request('POST', '/api/auth/demo-organizer', {
        email: 'sarah.organizer@eventhive.com',
      });
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.token);
      assert.strictEqual(res.body.user.name, 'Sarah Chen');
      sarahToken = res.body.token;
    });

    // 5. Authentication: Register New Organizer
    await test('Register New Organizer (POST /api/auth/register-organizer)', async () => {
      const randEmail = `host_${Date.now()}@eventhive.com`;
      const res = await request('POST', '/api/auth/register-organizer', {
        name: 'Marcus Vance',
        email: randEmail,
        password: 'password123',
        organization: 'Robotics Club',
      });
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.user.name, 'Marcus Vance');
    });

    // 6. Auth Protection: Missing Token Rejection
    await test('Auth Protection - Missing Token (401 Unauthorized)', async () => {
      const res = await request('GET', '/api/organizer/dashboard/stats');
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 7. Auth Protection: Invalid Token Rejection
    await test('Auth Protection - Invalid Token (401 Unauthorized)', async () => {
      const res = await request('GET', '/api/organizer/dashboard/stats', null, 'invalid.jwt.token');
      assert.strictEqual(res.status, 401);
    });

    // 8. Organizer Dashboard Statistics
    await test('Organizer Dashboard Statistics (GET /api/organizer/dashboard/stats)', async () => {
      const res = await request('GET', '/api/organizer/dashboard/stats', null, alexToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(typeof res.body.data.totalEvents === 'number');
      assert.ok(typeof res.body.data.totalRegistrations === 'number');
      assert.ok(Array.isArray(res.body.data.recentEvents));
      assert.ok(Array.isArray(res.body.data.recentRegistrations));
    });

    // 9. Create Event with Validation
    await test('Create Event - Valid Payload (POST /api/organizer/events)', async () => {
      const payload = {
        title: 'Global Tech & Cloud Summit 2026',
        description: 'Keynote sessions on distributed systems, AI edge computing, and serverless architectures.',
        category: 'Tech & Coding',
        date: '2026-11-15',
        startTime: '09:30',
        endTime: '18:00',
        venue: 'Convention Center, Hall 1',
        locationType: 'In-Person',
        maxCapacity: 350,
        bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
        registrationDeadline: '2026-11-10T23:59',
        contactEmail: 'alex.organizer@eventhive.com',
        contactPhone: '+1 (555) 234-5678',
        status: 'Published',
        tags: ['Cloud', 'Tech', 'Keynote'],
        price: 0,
      };

      const res = await request('POST', '/api/organizer/events', payload, alexToken);
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.title, payload.title);
      assert.strictEqual(res.body.data.organizerId, 'org_001');
      testEventId = res.body.data._id;
    });

    // 10. Create Event - Validation Failure
    await test('Create Event - Missing Required Fields (400 Bad Request)', async () => {
      const res = await request('POST', '/api/organizer/events', { title: '' }, alexToken);
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    // 11. List Organizer Events & Filter by Status
    await test('List Organizer Events & Filter (GET /api/organizer/events)', async () => {
      const res = await request('GET', '/api/organizer/events?status=Published', null, alexToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.every((e) => e.status === 'Published'));
      assert.ok(res.body.data.every((e) => e.organizerId === 'org_001'));
    });

    // 12. Search Events Query
    await test('Search Events by Query (GET /api/organizer/events?search=Global)', async () => {
      const res = await request('GET', '/api/organizer/events?search=Global', null, alexToken);
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.data.some((e) => e._id === testEventId));
    });

    // 13. View Event Details
    await test('View Event Details (GET /api/organizer/events/:id)', async () => {
      const res = await request('GET', `/api/organizer/events/${testEventId}`, null, alexToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data._id, testEventId);
      assert.ok(res.body.data.registrationsSummary);
    });

    // 14. Edit Event
    await test('Edit Event (PUT /api/organizer/events/:id)', async () => {
      const res = await request(
        'PUT',
        `/api/organizer/events/${testEventId}`,
        { title: 'Global Tech & Cloud Summit 2026 - Updated', maxCapacity: 400 },
        alexToken
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.title, 'Global Tech & Cloud Summit 2026 - Updated');
      assert.strictEqual(res.body.data.maxCapacity, 400);
    });

    // 15. Quick Status Change
    await test('Change Event Status (PATCH /api/organizer/events/:id/status)', async () => {
      const res = await request(
        'PATCH',
        `/api/organizer/events/${testEventId}/status`,
        { status: 'Ongoing' },
        alexToken
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.status, 'Ongoing');
    });

    // 16. Event Registrations Roster
    await test('View Event Registrations (GET /api/organizer/events/evt_101/registrations)', async () => {
      const res = await request('GET', '/api/organizer/events/evt_101/registrations', null, alexToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.stats.total >= 5);
    });

    // 17. Update Registration Status (Mark Attended)
    await test('Mark Attendee Status (PATCH /api/organizer/events/evt_101/registrations/reg_001)', async () => {
      const res = await request(
        'PATCH',
        '/api/organizer/events/evt_101/registrations/reg_001',
        { status: 'Attended' },
        alexToken
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.status, 'Attended');
    });

    // 18. Organizer Profile View & Update
    await test('View & Update Profile (GET & PUT /api/organizer/profile)', async () => {
      const getRes = await request('GET', '/api/organizer/profile', null, alexToken);
      assert.strictEqual(getRes.status, 200);
      assert.strictEqual(getRes.body.data.email, 'alex.organizer@eventhive.com');

      const putRes = await request(
        'PUT',
        '/api/organizer/profile',
        { bio: 'Updated Lead Organizer Bio' },
        alexToken
      );
      assert.strictEqual(putRes.status, 200);
      assert.strictEqual(putRes.body.data.bio, 'Updated Lead Organizer Bio');
    });

    // 19. Security & Ownership Boundary Checks (Sarah accessing Alex's event)
    await test('Ownership Isolation - Unauthorized Edit / View (403 Forbidden)', async () => {
      // Sarah tries to view Alex's test event
      const viewRes = await request('GET', `/api/organizer/events/${testEventId}`, null, sarahToken);
      assert.strictEqual(viewRes.status, 403);

      // Sarah tries to edit Alex's test event
      const editRes = await request('PUT', `/api/organizer/events/${testEventId}`, { title: 'Hack' }, sarahToken);
      assert.strictEqual(editRes.status, 403);

      // Sarah tries to view Alex's registrations
      const regRes = await request('GET', `/api/organizer/events/${testEventId}/registrations`, null, sarahToken);
      assert.strictEqual(regRes.status, 403);

      // Sarah tries to delete Alex's test event
      const delRes = await request('DELETE', `/api/organizer/events/${testEventId}`, null, sarahToken);
      assert.strictEqual(delRes.status, 403);
    });

    // 20. Delete Event
    await test('Delete Event (DELETE /api/organizer/events/:id)', async () => {
      const res = await request('DELETE', `/api/organizer/events/${testEventId}`, null, alexToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);

      // Verify event is now gone
      const verifyRes = await request('GET', `/api/organizer/events/${testEventId}`, null, alexToken);
      assert.strictEqual(verifyRes.status, 404);
    });

    console.log('\n====================================================');
    console.log(`📊 TEST RESULTS: ${passed} Passed, ${failed} Failed out of ${passed + failed} tests`);
    console.log('====================================================\n');

    if (failed > 0) {
      process.exitCode = 1;
    }
  } catch (globalErr) {
    console.error('Fatal Test Runner Error:', globalErr);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runComprehensiveTests();
